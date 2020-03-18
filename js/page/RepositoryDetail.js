import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Alert, Dimensions } from 'react-native';
import NavigationBar from '../widget/NavigationBar';
import { WebView } from 'react-native-webview';
import Toast from 'react-native-easy-toast';

class RepositoryDetail extends Component {

    static navigationOptions = {
        headerShown: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            url: this.props.navigation.getParam('url', 'null'),
            canGoBack: false,
            title: this.props.navigation.getParam('full_name', 'null')
        }
    }
    onBack() {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            this.props.navigation.goBack();
        }
    }
    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url,
        });
    }
    render() {
        let nav = <NavigationBar
            leftButton={NavigationTabViewHelper.getLeftButton(() => this.onBack())}
            popEnabled={false}
            title={this.state.title}
            rightButton={<Image style={{ height: 22, width: 22, marginTop: 10, marginRight: 10 }}
                source={require('../../res/images/ic_star.png')}
            />}
        />
        return (
            <View style={{ flex: 1 }}>
                {nav}
                {this.renderWebView()}
            </View>
        );
    }
    renderWebView() {
        const jsForInjection = `
  var el = document.getElementsByTagName('body')[0];
  el.style.height = '${Dimensions.get('window').height}px';
`
        return <WebView
            style={{ width: '100%', height: '100%' }}
            ref={webView => this.webView = webView}
            javaScriptEnabled={true}
            // injectedJavaScript={jsForInjection}
            startInLoadingState={true}
            onNavigationStateChange={(e) => this.onNavigationStateChange(e)}
            source={{ uri: this.state.url }} />
    }
}

export default RepositoryDetail;

class NavigationTabViewHelper {

    static getLeftButton(callBack) {
        return <TouchableOpacity
            style={{ padding: 8 }}
            onPress={callBack}>
            <Image
                style={{ width: 26, height: 26, }}
                source={require('../../res/images/ic_arrow_back_white_36pt.png')} />
        </TouchableOpacity>
    }
    static getRightButton(title, callBack) {
        return <TouchableOpacity
            style={{ alignItems: 'center', }}
            onPress={callBack}>
            <View style={{ marginRight: 10 }}>
                <Text style={{ fontSize: 20, color: '#FFFFFF', }}>{title}</Text>
            </View>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    setting_item_container: {
        backgroundColor: 'white',
        padding: 10, height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
})