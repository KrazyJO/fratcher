package de.wbg.fratcher.profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

	@Autowired private ProfileRepository profileRepository;
	
	public Iterable<Profile> getProfiles()
	{
		return profileRepository.findAll();
	}
	
	public void addProfile(Profile p)
	{
		profileRepository.save(p);
	}
	
	public Profile getProfile(Long id)
	{
		return profileRepository.findOne(id);
	}
}
