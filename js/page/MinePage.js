import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Platform,
    ScrollView,
    TouchableHighlight
} from "react-native";
import NavigationBar from "../widget/NavigationBar";
import { MORE_MENU } from "../common/MoreMenu";
import GlobalStyles from '../common/GlobalStyles'
import ViewUtils from "../common/ViewUtils";

export default class MinePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    onClick(menu) {

    }
    getItem(menu,icon,text){
        return ViewUtils.getSettingItem(()=>{this.onClick(menu)},icon,text,{tintColor:'#2196F3'},null)
    }
    render() {
        let nav = <NavigationBar
            title="我的"
            style={{ backgroundColor: '#2196F3' }}
        />
        return (
            <View style={styles.container}>
                {nav}
                <ScrollView>
                    <TouchableHighlight
                        onPress={() => this.onClick(MORE_MENU.About)}>
                        <View style={styles.item}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={require('../../res/images/ic_trending.png')}
                                    style={[{ width: 40, height: 40, marginRight: 10 }, { tintColor: '#2196F3' }]} />
                                <Text>github popular</Text>
                            </View>
                            <Image source={require('../../res/images/ic_tiaozhuan.png')}
                                style={[{ width: 22, height: 22, marginRight: 10 }, { tintColor: '#2196F3' }]} />
                        </View>
                    </TouchableHighlight>
                    <View style={GlobalStyles.line} />
                    
                    {/*趋势管理*/}
                    <Text style={styles.groupTitle}>趋势管理</Text>
                    {/*自定义语言*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Custom_Language, require('../../res/img/ic_custom_language.png'), '自定义语言')}
                    {/*语言排序*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Sort_Language, require('../../res/img/ic_swap_vert.png'), '语言排序')}

                    {/*最热管理*/}
                    <Text style={styles.groupTitle}>最热管理</Text>
                    {/*自定义标签*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Custom_Key, require('../../res/img/ic_custom_language.png'), '自定义标签')}
                    {/*标签排序*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Sort_Key, require('../../res/img/ic_swap_vert.png'), '标签排序')}
                    {/*标签移除*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Remove_Key, require('../../res/img/ic_remove.png'), '标签移除')}

                    {/*设置*/}
                    <Text style={styles.groupTitle}>设置</Text>
                    {/*自定义主题*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Custom_Theme, require('../../res/img/ic_view_quilt.png'), '自定义主题')}
                    {/*关于作者*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.About_Author, require('../../res/img/ic_insert_emoticon.png'), '关于作者')}
                    <View style={GlobalStyles.line}/>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        backgroundColor: 'white',
        padding: 10, height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    groupTitle: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 5,
        fontSize: 12,
        color: 'gray'
    },
})