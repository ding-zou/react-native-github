import React, { Component } from 'react';
import TabNavigator from 'react-native-tab-navigator'
import { View, StyleSheet,Image } from 'react-native';
import FavoritePage from './FavoritePage';
import TrendingPage from './TrendingPage';
import Toast,{DURATION} from 'react-native-easy-toast'
import PopularPage from './PopularPage';
import MinePage from './MinePage';
import store from '../store';

class HomePage extends Component {

    static navigationOptions = {
        headerShown: false,
      };

    constructor(props) {
        super(props);
        let selectedTab = this.props.selectedTab ? this.props.selectedTab : 'tb_popular';
        this.state = {
            selectedTab: selectedTab,
        }
    
    }
    render() {
        return (
            <View style={styles.container}>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_popular'}
                        selectedTitleStyle={{color: '#2196F3'}}
                        title="最热"
                        renderIcon={() => <Image style={styles.image}
                                                 source={require('../../res/images/ic_polular.png')}/>}
                        renderSelectedIcon={() =><Image style={[styles.image, {tintColor: '#2196F3'}]}
                                                        source={require('../../res/images/ic_polular.png')}/>}
                        onPress={() => this.setState({selectedTab: 'tb_popular'})}>
                        <PopularPage {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_trending'}
                        title="趋势"
                        selectedTitleStyle={{color: 'yellow'}}
                        renderIcon={() => <Image style={styles.image}
                                                 source={require('../../res/images/ic_trending.png')}/>}
                        renderSelectedIcon={() =><Image style={[styles.image, {tintColor: 'yellow'}]}
                                                        source={require('../../res/images/ic_trending.png')}/>}
                        onPress={() => this.setState({selectedTab: 'tb_trending'})}>
                        <TrendingPage {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_favorite'}
                        title="收藏"
                        selectedTitleStyle={{color: 'green'}}
                        renderIcon={() => <Image style={styles.image}
                                                 source={require('../../res/images/ic_favorite.png')}/>}
                        renderSelectedIcon={() =><Image style={[styles.image, {tintColor: 'green'}]}
                                                        source={require('../../res/images/ic_favorite.png')}/>}
                        onPress={() => this.setState({selectedTab: 'tb_favorite'})}>
                        <FavoritePage {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_my'}
                        title="我的"
                        selectedTitleStyle={{color: 'blue'}}
                        renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_my.png')}/>}
                        renderSelectedIcon={() =><Image style={[styles.image, {tintColor: 'blue'}]}
                                                        source={require('../../res/images/ic_my.png')}/>}
                        onPress={() => this.setState({selectedTab: 'tb_my'})}>
                        <MinePage {...this.props}/>
                    </TabNavigator.Item>
                </TabNavigator>
                <Toast ref={(toast)=>this.toast=toast}/>
            </View>
        );
    }
}

export default HomePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        height: 26,
        width: 26,
    }
});