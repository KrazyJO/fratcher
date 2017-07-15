package de.wbg.fratcher.profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
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
	public String addProfile(@RequestBody Profile p)
	{
		profileService.addProfile(p);
//		profileService.getProfile(id)
		
		return "localhost:8080/api/profile/"+p.getId();
	}
	
	@RequestMapping(value = "/api/profile/{id}", method = RequestMethod.GET)
	public Profile getProfile(@PathVariable Long id)
	{
		return profileService.getProfile(id);
	}
	
	@RequestMapping(value = "/api/profile/{id}", method = RequestMethod.POST)
	public void editProfile(@RequestBody Profile p)
	{
		
	}
}
