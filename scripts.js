document.addEventListener('DOMContentLoaded', function() {
    const leagueSelect = document.getElementById('league-select');
    const homeTeamSelect = document.getElementById('home-team-select');
    const awayTeamSelect = document.getElementById('away-team-select');
    const teamSelectors = document.getElementById('team-selectors');
    const streamContainer = document.getElementById('stream-container');
    const streamIframe = document.getElementById('stream-iframe');
    const fullScreenButton = document.getElementById('full-screen-button');
    const refreshStreamButton = document.getElementById('refresh-stream-button');
    const toggleStreamButton = document.getElementById('toggle-stream-button');
    const hideOptionsButton = document.getElementById('hide-options-button');
    const sportContainer = document.getElementById('sport-container'); // Added reference to the sport container

    let currentStream = 2;

    const teams = {
        nba: [
            "Atlanta Hawks", "Boston Celtics", "Brooklyn Nets", "Charlotte Hornets", "Chicago Bulls",
            "Cleveland Cavaliers", "Dallas Mavericks", "Denver Nuggets", "Detroit Pistons", "Golden State Warriors",
            "Houston Rockets", "Indiana Pacers", "LA Clippers", "Los Angeles Lakers", "Memphis Grizzlies",
            "Miami Heat", "Milwaukee Bucks", "Minnesota Timberwolves", "New Orleans Pelicans", "New York Knicks",
            "Oklahoma City Thunder", "Orlando Magic", "Philadelphia 76ers", "Phoenix Suns", "Portland Trail Blazers",
            "Sacramento Kings", "San Antonio Spurs", "Toronto Raptors", "Utah Jazz", "Washington Wizards"
        ],
        nfl: [
            "Arizona Cardinals", "Atlanta Falcons", "Baltimore Ravens", "Buffalo Bills", "Carolina Panthers",
            "Chicago Bears", "Cincinnati Bengals", "Cleveland Browns", "Dallas Cowboys", "Denver Broncos",
            "Detroit Lions", "Green Bay Packers", "Houston Texans", "Indianapolis Colts", "Jacksonville Jaguars",
            "Kansas City Chiefs", "Las Vegas Raiders", "Los Angeles Chargers", "Los Angeles Rams", "Miami Dolphins",
            "Minnesota Vikings", "New England Patriots", "New Orleans Saints", "New York Giants", "New York Jets",
            "Philadelphia Eagles", "Pittsburgh Steelers", "San Francisco 49ers", "Seattle Seahawks", "Tampa Bay Buccaneers",
            "Tennessee Titans", "Washington Commanders"
        ],
        mlb: [
            "Arizona Diamondbacks", "Atlanta Braves", "Baltimore Orioles", "Boston Red Sox", "Chicago Cubs",
            "Chicago White Sox", "Cincinnati Reds", "Cleveland Guardians", "Colorado Rockies", "Detroit Tigers",
            "Houston Astros", "Kansas City Royals", "Los Angeles Angels", "Los Angeles Dodgers", "Miami Marlins",
            "Milwaukee Brewers", "Minnesota Twins", "New York Mets", "New York Yankees", "Oakland Athletics",
            "Philadelphia Phillies", "Pittsburgh Pirates", "San Diego Padres", "San Francisco Giants", "Seattle Mariners",
            "St. Louis Cardinals", "Tampa Bay Rays", "Texas Rangers", "Toronto Blue Jays", "Washington Nationals"
        ],
        nhl: [
            "Anaheim Ducks", "Arizona Coyotes", "Boston Bruins", "Buffalo Sabres", "Calgary Flames",
            "Carolina Hurricanes", "Chicago Blackhawks", "Colorado Avalanche", "Columbus Blue Jackets", "Dallas Stars",
            "Detroit Red Wings", "Edmonton Oilers", "Florida Panthers", "Los Angeles Kings", "Minnesota Wild",
            "Montreal Canadiens", "Nashville Predators", "New Jersey Devils", "New York Islanders", "New York Rangers",
            "Ottawa Senators", "Philadelphia Flyers", "Pittsburgh Penguins", "San Jose Sharks", "Seattle Kraken",
            "St. Louis Blues", "Tampa Bay Lightning", "Toronto Maple Leafs", "Vancouver Canucks", "Vegas Golden Knights",
            "Washington Capitals", "Winnipeg Jets"
        ],
        mls: [
            "Atlanta United", "Austin FC", "Charlotte FC", "Chicago Fire", "Cincinnati FC", "Colorado Rapids",
            "Columbus Crew", "D.C. United", "Dallas FC", "Houston Dynamo", "Inter Miami CF", "LA Galaxy",
            "LAFC", "Minnesota United", "CF Montreal", "Nashville SC", "New England Revolution", "New York City FC",
            "New York Red Bulls", "Orlando City SC", "Philadelphia Union", "Portland Timbers", "Real Salt Lake",
            "San Jose Earthquakes", "Seattle Sounders", "Sporting Kansas City", "Toronto FC", "Vancouver Whitecaps"
        ],
        cfb: [
            "Air Force Falcons", "Akron Zips", "Alabama Crimson Tide", "Appalachian State Mountaineers", 
            "Arizona Wildcats", "Arizona State Sun Devils", "Arkansas Razorbacks", "Auburn Tigers", 
            "Ball State Cardinals", "Baylor Bears", "Boston College Eagles", "Bowling Green Falcons", 
            "BYU Cougars", "California Golden Bears", "Central Michigan Chippewas", "Charlotte 49ers", 
            "Clemson Tigers", "Colorado Buffaloes", "Connecticut Huskies", "Duke Blue Devils", 
            "East Carolina Pirates", "Eastern Michigan Eagles", "Florida Atlantic Owls", "Florida Gators", 
            "Florida State Seminoles", "Fresno State Bulldogs", "Georgia Bulldogs", "Georgia Southern Eagles", 
            "Georgia State Panthers", "Georgia Tech Yellow Jackets", "Hawaii Rainbow Warriors", 
            "Houston Cougars", "Indiana Hoosiers", "Iowa Hawkeyes", "Iowa State Cyclones", 
            "Kansas Jayhawks", "Kansas State Wildcats", "Kentucky Wildcats", "Liberty Flames", 
            "LSU Tigers", "Marshall Thundering Herd", "Maryland Terrapins", "Miami Hurricanes", 
            "Michigan Wolverines", "Michigan State Spartans", "Minnesota Golden Gophers", 
            "Mississippi State Bulldogs", "Mississippi Rebels", "Missouri Tigers", "Navy Midshipmen", 
            "Nebraska Cornhuskers", "Nevada Wolf Pack", "New Mexico Lobos", "North Carolina Tar Heels", 
            "North Carolina State Wolfpack", "Northwestern Wildcats", "Notre Dame Fighting Irish", 
            "Ohio State Buckeyes", "Oklahoma Sooners", "Oklahoma State Cowboys", "Old Dominion Monarchs", 
            "Oregon Ducks", "Oregon State Beavers", "Penn State Nittany Lions", "Pittsburgh Panthers", 
            "Purdue Boilermakers", "Rice Owls", "Rutgers Scarlet Knights", "San Diego State Aztecs", 
            "San Jose State Spartans", "SMU Mustangs", "South Alabama Jaguars", "South Carolina Gamecocks", 
            "Southern Miss Golden Eagles", "Stanford Cardinal", "Syracuse Orange", "Temple Owls", 
            "Tennessee Volunteers", "Texas Longhorns", "Texas A&M Aggies", "Texas State Bobcats", 
            "Toledo Rockets", "Troy Trojans", "Tulane Green Wave", "Tulsa Golden Hurricane", 
            "UAB Blazers", "UCF Knights", "UCLA Bruins", "USC Trojans", "Utah Utes", 
            "Utah State Aggies", "Vanderbilt Commodores", "Virginia Cavaliers", "Virginia Tech Hokies", 
            "Wake Forest Demon Deacons", "Washington Huskies", "Washington State Cougars", 
            "West Virginia Mountaineers", "Western Kentucky Hilltoppers", "Western Michigan Broncos", 
            "Wyoming Cowboys"
        ],
        wnba: [
            "Atlanta Dream", "Chicago Sky", "Connecticut Sun", "Dallas Wings", "Indiana Fever",
            "Las Vegas Aces", "Los Angeles Sparks", "Minnesota Lynx", "New York Liberty", "Phoenix Mercury",
            "Seattle Storm", "Washington Mystics"
        ]
    };
    
    leagueSelect.addEventListener('change', function() {
        const selectedLeague = this.value;
        homeTeamSelect.innerHTML = '<option value="">--Select Home Team--</option>';
        awayTeamSelect.innerHTML = '<option value="">--Select Away Team--</option>';
        
        if (selectedLeague) {
            teamSelectors.classList.remove('hidden');
            streamContainer.classList.add('hidden');
            
            teams[selectedLeague].forEach(team => {
                const option = document.createElement('option');
                option.value = team;
                option.textContent = team;
                homeTeamSelect.appendChild(option);
                awayTeamSelect.appendChild(option.cloneNode(true));
            });
        } else {
            teamSelectors.classList.add('hidden');
            streamContainer.classList.add('hidden');
        }
    });

    function generateStreamURL() {
        const league = leagueSelect.value;
        const homeTeam = homeTeamSelect.value.replace(/\s+/g, '-').toLowerCase();
        const awayTeam = awayTeamSelect.value.replace(/\s+/g, '-').toLowerCase();
        const streamType = currentStream === 1 ? 'stream-1' : 'stream-2';

        return `https://embedstreams.me/${league}/${homeTeam}-vs-${awayTeam}-${streamType}`;
    }

    function updateStream() {
        if (leagueSelect.value && homeTeamSelect.value && awayTeamSelect.value) {
            streamIframe.src = generateStreamURL();
            streamContainer.classList.remove('hidden');
        }
    }

    homeTeamSelect.addEventListener('change', updateStream);
    awayTeamSelect.addEventListener('change', updateStream);

    fullScreenButton.addEventListener('click', function() {
        if (streamIframe.requestFullscreen) {
            streamIframe.requestFullscreen();
        } else if (streamIframe.mozRequestFullScreen) { // Firefox
            streamIframe.mozRequestFullScreen();
        } else if (streamIframe.webkitRequestFullscreen) { // Chrome, Safari and Opera
            streamIframe.webkitRequestFullscreen();
        } else if (streamIframe.msRequestFullscreen) { // IE/Edge
            streamIframe.msRequestFullscreen();
        }
    });

    refreshStreamButton.addEventListener('click', function() {
        streamIframe.src = streamIframe.src;
    });

    toggleStreamButton.addEventListener('click', function() {
        currentStream = currentStream === 1 ? 2 : 1;
        toggleStreamButton.textContent = `Stream ${currentStream}`;
        updateStream();
    });

    hideOptionsButton.addEventListener('click', function() {
        const isHidden = hideOptionsButton.textContent === 'Show Options';
        sportContainer.classList.toggle('hidden', !isHidden); // Fixed this line
        teamSelectors.classList.toggle('hidden', !isHidden);
        hideOptionsButton.textContent = isHidden ? 'Hide Options' : 'Show Options';
    });
});
