import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
    View, Text, Image, StyleSheet, Platform, StatusBar, ViewPropTypes, TouchableOpacity
} from 'react-native'

const NAV_BAR_HEIGHT_ANDROID = 50
const NAV_BAR_HEIGHT_IOS = 44
const STATUS_BAR_HEIGHT = 20
const StatusBarSHape = {
    backgroundColor: PropTypes.string,
    barStyle: PropTypes.oneOf('default', 'light-content', 'dark-content'),
    hidder: PropTypes.bool
}
class NavigationBar extends Component {
    static propTypes = {
        style: ViewPropTypes.style,
        title: PropTypes.string,
        titleView: PropTypes.element,
        hide: PropTypes.bool,
        leftButton: PropTypes.element,
        rightButton: PropTypes.element,
        statusBar: PropTypes.shape(StatusBarSHape)
    }
    static defaultProps = {
        statusBar: {
            barStyle: 'dark-content',
            hidder: false
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            hide: false
        }
    }
    render() {
        let statusBar = !this.props.statusBar.hidden ?
            <View style={styles.statusBar}>
                <StatusBar {...this.props.statusBar} />
            </View> : null;
        let titleView = this.props.titleView ? this.props.titleView : <Text style={[styles.titleStyle]}>{this.props.title}</Text>;
        let content = <View style={styles.navBar}>{this.props.leftButton}
            <View style={styles.titleViewStyle}>
                {titleView}
            </View>
            {this.props.rightButton}</View>;
        return (
            <View style={[styles.container, this.props.style]}>
                {statusBar}
                {content}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2196F3'
    },
    navBar: {
        justifyContent: 'space-between',
        alignContent: 'center',
        height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
        flexDirection: 'row'
    },
    titleViewStyle: {
        justifyContent: 'center',
        left: 40,
        right: 40,
        top: 0,
        position: 'absolute',
        bottom: 0,
        alignItems: 'center'
    },
    titleStyle: {
        fontSize: 20,
        color: 'white',
        marginBottom:5
    },
    statusBar: {
        height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0
    }
})

export default NavigationBar;

