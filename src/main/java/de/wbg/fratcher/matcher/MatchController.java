package de.wbg.fratcher.matcher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import de.wbg.fratcher.matcher.MatchService.UserWithProfile;
import de.wbg.fratcher.user.UserService;

@RestController
public class MatchController {

	@Autowired
	private MatchService matchService;
	
	@Autowired
	private UserService userService;
	
	
	
	@RequestMapping(value = "/api/matches", method = RequestMethod.GET)
	public ResponseEntity<Iterable<UserWithProfile>> getUsersMatched() 
	{
		if (userService.isAnonymous())
		{
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		
		Long userId = userService.getCurrentUser().getId();
		Iterable<UserWithProfile> userProfiles = matchService.findUserMatches(userId);
		
		return ResponseEntity.ok(userProfiles);
	}
	
	@RequestMapping(value = "/api/unmatched", method = RequestMethod.GET)
	public ResponseEntity<Iterable<MatchService.UserWithProfile>> getUserUnmatched()
	{
		if (userService.isAnonymous())
		{
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		
		Iterable<MatchService.UserWithProfile> userProfiles = matchService.getUserUnmatched(userService.getCurrentUser().getId());
		
		return ResponseEntity.ok(userProfiles);
	}
	
	@RequestMapping(value = "/api/like/{id}", method = RequestMethod.PATCH)
	public ResponseEntity<Object> likeUser(@PathVariable Long id)
	{
		if (userService.isAnonymous())
		{
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		matchService.likeUser(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@RequestMapping(value = "/api/dislike/{id}", method = RequestMethod.PATCH)
	public ResponseEntity<Object> dislikeUser(@PathVariable Long id)
	{
		if (userService.isAnonymous())
		{
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		matchService.dislikeUser(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
