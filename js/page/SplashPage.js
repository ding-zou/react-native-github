import React, { Component } from 'react';
import HomePage from './HomePage';
import { StyleSheet,View } from 'react-native';
import { NavigationActions } from 'react-navigation';

class SplashPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        const resetAction = NavigationActions.navigate({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'Home'}),
            ]
          })
        this.timer = setTimeout(() => {
            this.props.navigation.navigate('Home')
        }, 0)
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }
    render() {
        return (
            <View style={styles.container}>
            </View>)
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    tips: {
        fontSize: 29
    }
})
export default SplashPage;