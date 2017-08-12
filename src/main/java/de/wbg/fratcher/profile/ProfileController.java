package de.wbg.fratcher.profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import de.wbg.fratcher.user.User;
import de.wbg.fratcher.user.UserService;

@RestController
public class ProfileController {
	
	@Autowired
	private ProfileService profileService;
	@Autowired
	private UserService userService;
	
//	@RequestMapping(value = "/api/profiles", method=RequestMethod.GET)
//	public Iterable<Profile> getProfiles() {
//		return profileService.getProfiles();
//	}
	
	@RequestMapping(value = "/api/profile/add", method = RequestMethod.POST)
	public String addProfile(@RequestBody Profile p)
	{
		profileService.addProfile(p);
//		profileService.getProfile(id)
		
		return "localhost:8080/api/profile/"+p.getId();
	}
	
	/**
	 * here we get user id
	 * @param id userId
	 * @return
	 */
	@RequestMapping(value = "/api/profile/{id}", method = RequestMethod.GET)
	public ResponseEntity<Profile> getProfile(@PathVariable Long id)
	{
		if (userService.isAnonymous())
		{
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
//		Profile profile = profileService.getProfile(id);
//		User user = userService.getCurrentUser();
//		Profile profile2 = user.getProfile();
		Profile profile = profileService.getProfile(id);
		if (profile == null)
		{
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return ResponseEntity.ok(profile);
	}
	
	@RequestMapping(value = "/api/profile/{id}", method = RequestMethod.POST)
	public void editProfile(@RequestBody Profile p)
	{
		profileService.editProfile(p);
	}
}
