package de.wbg.fratcher.profile;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.wbg.fratcher.user.UserService;

@Service
public class ProfileService {

	private static final Logger LOG = LoggerFactory.getLogger(ProfileService.class);
	
	@Autowired 
	private ProfileRepository profileRepository;
	@Autowired
	private UserService userService;
	
	public Iterable<Profile> getProfiles()
	{
		return profileRepository.findAll();
	}
	
	public void addProfile(Profile p)
	{
		profileRepository.save(p);
	}
	
	/**
	 * Only own profile or profile of matches are allowed to return
	 * @param id userId (not profile)
	 * @return profile
	 */
	public Profile getProfile(Long id)
	{
		Long myId = userService.getCurrentUser().getId();
		LOG.info("user {} fetches profile for user {}", myId, id);
		Long profileId;
		if (!id.equals(myId))
		{
			if (!userService.isUserMatched(id))
			{
				LOG.error("user {} tryed to fetch unmatched profile for user {}", myId, id);
				return null;
			}
			else
			{
				profileId = userService.getProfileIdFromUser(id);
				if (profileId == -1L)
				{
					LOG.error("no profile for user {}", id);
					return null;
				}
			}
		}
		else
		{
			profileId = userService.getCurrentUser().getProfile().getId();
		}
		
		return profileRepository.findOne(profileId);
	}
	
	public void editProfile(Profile p)
	{
		Long profileId = userService.getCurrentUser().getProfile().getId();
		p.setId(profileId);
		profileRepository.save(p);
		LOG.info("user {} edited profil", userService.getCurrentUser().getId());
	}
}
