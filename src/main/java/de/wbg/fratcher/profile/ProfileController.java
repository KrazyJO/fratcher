package de.wbg.fratcher.profile;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProfileController {
	
	private class ProfileReturn {
		public String profile;
	}

	@RequestMapping(value = "/api/profiles", method=RequestMethod.GET)
	public ProfileReturn getProfiles() {
		ProfileReturn ret = new ProfileReturn();
		ret.profile = "this is my description";
		return ret;
	}
	
}
