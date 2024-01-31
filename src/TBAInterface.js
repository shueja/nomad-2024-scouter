// TBAInterface funcitons to pull data from TheBlueAlliance.com
var teams = null;
var schedule = null;
var authKey = "9DZZQh1sNphG06vwCrX6tJXjucIGan6lGbXaiQ0q5T7qhDkzgYSAP83ekuLYhpWb";
/**
 * Get list of teams in event
 *
 * @param {eventCode} eventCode the event code (i.e. 2020caln) to pull the team list
 */
export function getTeams(eventCode) {
	if (authKey) {
		var xmlhttp = new XMLHttpRequest();
		var url = "https://www.thebluealliance.com/api/v3/event/" + eventCode + "/teams/simple";
		console.log("fetch teams")
		xmlhttp.open("GET", url, true);
		xmlhttp.setRequestHeader("X-TBA-Auth-Key", authKey);
		xmlhttp.onreadystatechange = function() {
			if (this.readyState === 4 ) {
				if (this.status === 200) {
				var response = this.responseText;
				teams = JSON.parse(response);
				window.localStorage.setItem(`${eventCode}-teams`, response);
				console.log("fetched teams from TBA");
				}
				else if (this.status === 0) {
					console.log("could not reach TBA");
					var teamsStr = window.localStorage.getItem(`${eventCode}-teams`);
					if(teamsStr != null) {
						console.log("Found teams in local storage.");
						teams = JSON.parse(teamsStr);
						
					}
					else {
						teams = {};
					}
				}
			}
		};
		// Send request
		xmlhttp.send();
		console.log("fetch teams")
	}
	else {
		console.log("no auth")
	}
}

export function getTeamsForMatch(eventCode, matchNum, level) {
 var matchData = getMatch(eventCode + "_" + level + matchNum);
 if (matchData === null) {
	return [];
 } 
 if ( !( "red" in matchData && "blue" in matchData)) {
	return [];
 }
 return [
	matchData.red.team_keys[0].replace("frc", ""),
	matchData.red.team_keys[1].replace("frc", ""),
	matchData.red.team_keys[2].replace("frc", ""),
	matchData.blue.team_keys[0].replace("frc", ""),
	matchData.blue.team_keys[1].replace("frc", ""),
	matchData.blue.team_keys[2].replace("frc", ""),
	
 ]
}


function getMatch(matchKey){
	//This needs to be different than getTeamName() because of how JS stores their data
	if(matchKey !== undefined){
		if (schedule) {
			var ret = {};
			Array.from(schedule).forEach(match => ret = match.key === matchKey ? match.alliances : ret);
			console.log(ret)
			return ret;
		}
	}
	return null;
}
/**
 * Get schefule for event
 *
 * @param {eventCode} eventCode the event code (i.e. 2020caln) to pull the team list
 */
export function getSchedule(eventCode) {
	if (authKey) {
		var xmlhttp = new XMLHttpRequest();
		var url = "https://www.thebluealliance.com/api/v3/event/" + eventCode + "/matches/simple";
		xmlhttp.open("GET", url, true);
		xmlhttp.setRequestHeader("X-TBA-Auth-Key", authKey);
		xmlhttp.onreadystatechange = function() {
			if (this.readyState === 4 ) {
				if (this.status === 200) {
				var response = this.responseText;
				schedule = JSON.parse(response);
				window.localStorage.setItem(`${eventCode}-schedule`, response);
				return 0;
				}
				else if (this.status === 0) {
					console.log("could not reach TBA");
					var scheduleStr = window.localStorage.getItem(`${eventCode}-schedule`);
					if(scheduleStr != null) {
						console.log("Found schedule in local storage.");
						schedule = JSON.parse(scheduleStr);
						return 0;
					}
					else {
						schedule = {};
						return 1;
					}
				}
			}
		};
		// Send request
		xmlhttp.send();
	}
}
