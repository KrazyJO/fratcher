package de.wbg.fratcher.profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProfileController {
	
	@Autowired
	private ProfileService profileService;
	
	@RequestMapping(value = "/api/profiles", method=RequestMethod.GET)
	public Iterable<Profile> getProfiles() {
		return profileService.getProfiles();
	}
	
	@RequestMapping(value = "/api/profile/add", method = RequestMethod.POST)
	public void addProfile(@RequestBody Profile p)
	{
		profileService.addProfile(p);
	}
	
}
