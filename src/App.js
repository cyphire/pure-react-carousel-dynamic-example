//import logo from './logo.svg';
import './App.css';

import React from 'react'
import Articles from  './ArticlesTest'
import articles1 from './art1';
import articles2 from './art2';
import './bootstrap.min.css';
import './styles.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div class="container">
		<h1>Start-----></h1>		
				<Articles articles={articles1}/>
		<h1>End------></h1>
		<h1>Start-----></h1>		
				<Articles articles={articles2}/>
		<h1>End------></h1>
	</div>
      </header>
    </div>
  );
}

export default App;
