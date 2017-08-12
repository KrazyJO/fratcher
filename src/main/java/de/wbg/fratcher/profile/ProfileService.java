package de.wbg.fratcher.profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.wbg.fratcher.user.UserService;

@Service
public class ProfileService {

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
		Long profileId;
		if (id != myId)
		{
			if (!userService.isUserMatched(id))
			{
				return null;
			}
			else
			{
				profileId = userService.getProfileIdFromUser(id);
				if (profileId == -1L)
				{
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
		profileRepository.save(p);
	}
}
