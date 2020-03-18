import React, { Component } from 'react';
import { View, FlatList, Text, Image, DeviceEventEmitter, StyleSheet, RefreshControl } from 'react-native';
import NavigationBar from '../widget/NavigationBar';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'
import LanguageDao, { FLAG_LANGUAGE } from '../dao/LanguageDao';
import DataRepository, { FLAG_STORAGE } from '../repo/DataRepository';
import TrendingRepoCell from '../widget/TrendingRepoCell';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FavoDao from '../dao/FavoDao';
import { starTrendAction } from '../store/action_creators';
import store from '../store';

const API_URL = 'https://github.com/trending/'
var timeSpanTextArray = [new TimeSpan('今天', 'since=daily'), new TimeSpan('本周', 'since=weekly'), new TimeSpan('本月', 'since=monthly')]
export function TimeSpan(showText, searchText) {
    this.showText = showText;
    this.searchText = searchText;
}
class TrendingPage extends Component {
    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_language);
        this.state = {
            result: '',
            timeSpan: timeSpanTextArray[0],
            languages: [],
            isVisible:false
        }
        this.loadLanguage();
    }

    loadLanguage() {
        this.languageDao.fetchLanguage().then((language) => {
            if (language) {
                this.setState({
                    languages: language
                })
            }
        }).catch((e) => {
            console.log(e)
        })
    }
    renderTitleView() {
        return <View>
            <TouchableOpacity onPress={() => this.setState({isVisible:true})}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, color: 'white', fontWeight: '400' }}>{'趋势' + this.state.timeSpan.showText}</Text>
                    <Image style={{ width: 12, height: 12, marginLeft: 5 }}
                        source={require('../../res/images/ic_spinner_triangle.png')}
                    />
                </View>
            </TouchableOpacity>
        </View>
    }
    render() {
        let navigationBar =
            <NavigationBar
                titleView={this.renderTitleView()}
                statusBar={{ backgroundColor: "#2196F3" }}
            />;
        let content = this.state.languages.length > 0 ?
            <ScrollableTabView
                tabBarUnderlineStyle={{ backgroundColor: '#e7e7e7', height: 2 }}
                tabBarInactiveTextColor='mintcream'
                tabBarActiveTextColor='white'
                ref="scrollableTabView"
                tabBarBackgroundColor="#2196F3"
                initialPage={0}
                renderTabBar={() => <ScrollableTabBar style={{ height: 40, borderWidth: 0, elevation: 2 }}
                    tabStyle={{ height: 39 }} />}
            >
                {this.state.languages.map((reuslt, i, arr) => {
                    let language = arr[i];
                    return language.checked ? <TrendingTabContent key={i} tabLabel={language.name}
                        tabKey={language.path} timeSpan={this.state.timeSpan} {...this.props} /> : null;
                })}
            </ScrollableTabView> : null;
        return <View style={styles.container}>
            {navigationBar}
            {content}
        </View>
    }

}
export class TrendingTabContent extends Component {
    constructor(props) {
        super(props)
        this.favoDao = new FavoDao()
        this.dataRepository = new DataRepository(FLAG_STORAGE.flag_trending);
        this.state = {
            dataSource: [],
            isLoading: false
        }
    }
    componentDidMount() {
        this.loadData(this.props.timeSpan)
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={(item) => this.renderRow(item)}
                    showsVerticalScrollIndicator={false}//是否显示垂直滚动条
                    showsHorizontalScrollIndicator={false}//是否显示水平滚动条
                    numColumns={1}//每行显示1个
                    // ref={(flatList) => this._flatList = flatList}
                    // ListHeaderComponent={this.renderHeader}//头部
                    // ListFooterComponent={this.renderFooter}//尾巴
                    // ItemSeparatorComponent={this.renderSeparator}//每行底部---一般写下划线
                    enableEmptySections={true}//数据可以为空
                    keyExtractor={(item, index) => item.key = index}
                    onEndReachedThreshold={0.1}//执行上啦的时候10%执行
                    // onEndReached={this.LoreMore}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isLoading}
                            onRefresh={() => this.loadData(this.props.timeSpan)}
                            title="Loading..."
                            titleColor='#2196F3'
                            colors={['#2196F3']}
                            tintColor='#2196F3'
                        />
                    }
                />
            </View>
        );
    }

    loadData(timeSpan) {
        this.setState({
            isLoading: true
        })
        let url = API_URL + this.props.tabKey + '?' + timeSpan.searchText;
        this.dataRepository.fetchRepository(url)
            .then((res) => {
                let items = res && res.items ? res.items : res ? res : []
                this.setState({
                    dataSource: items,
                    isLoading: false
                })
                DeviceEventEmitter.emit('showToast', '显示缓存数据')
                if (res && res.update_time && !this.dataRepository.checkDate(res.update_time)) {
                    return this.dataRepository.fetchNetRepository(url)
                }
            }).then((items) => {
                if (!items || items.length === 0) return;
                this.setState({
                    dataSource: items,
                });
                DeviceEventEmitter.emit('showToast', '显示网络数据');
            }).catch(error => {
                console.log(error);
                this.setState({
                    isLoading: false
                });
            })
    }

    onSelectRepository(item) {
        this.props.navigation.navigate('RepositoryDetail', {
            full_name: item.item.fullName,
            // component: RepositoryDetail,
            url: "https:///github.com/" + item.item.fullName,
            // ...this.props
        });
    }

    renderRow(data) {
        return <TrendingRepoCell
            key={data.id}
            data={data}
            onSelect={() =>
                this.onSelectRepository(data)
            }
            onFavorite={(isFavo) => {
                this.favoDao.saveFavoItem('趋势',data,!isFavo)
                const action = starTrendAction()
                store.dispatch(action)
            }}
        />
    }
}

export default TrendingPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    tips: {
        fontSize: 20
    }
})
