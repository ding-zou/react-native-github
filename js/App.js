import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { RouterConfigs } from './router/RouterConfig';
const AppContainer = createAppContainer(RouterConfigs);
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    // renderScene(route, navigator) {
    //     let Component = route.component;
    //     return <Component {...route.params} navigator={navigator}/>
    // }
    render() {
        return (<AppContainer />)

        // ( 
        //     <Navigator
        //     initialRoute={{component: SplashPage}}
        //     renderScene={(route, navigator)=>this.renderScene(route, navigator)}
        //     />
        //  );
    }

}
export default App;
