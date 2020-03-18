import React, { Component } from 'react';
import { View, FlatList, DeviceEventEmitter, StyleSheet, RefreshControl } from 'react-native';
import GithubRepoCell from '../widget/GithubRepoCell';
import NavigationBar from '../widget/NavigationBar';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'
import LanguageDao, { FLAG_LANGUAGE } from '../dao/LanguageDao';
import DataRepository, { FLAG_STORAGE } from '../repo/DataRepository';
import RepositoryDetail from './RepositoryDetail';
import FavoDao from '../dao/FavoDao';
import { starPopuAction } from '../store/action_creators';
import store from '../store';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
class PopularPage extends Component {
    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.state = {
            result: '',
            languages: [],
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
    render() {
        let navigationBar =
            <NavigationBar
                title={'最热'}
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
                    return language.checked ? <PopularTabContent key={i} tabLabel={language.name} {...this.props} /> : null;
                })}
            </ScrollableTabView> : null;
        return <View style={styles.container}>
            {navigationBar}
            {content}
        </View>
    }

}
export class PopularTabContent extends Component {
    constructor(props) {
        super(props)
        this.favoDao = new FavoDao()
        this.dataRepository = new DataRepository(FLAG_STORAGE.flag_popular);
        this.state = {
            dataSource: [],
            isLoading: false
        }
    }
    componentDidMount() {
        this.loadData()
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
                            onRefresh={() => this.loadData()}
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

    loadData() {
        this.setState({
            isLoading: true
        })
        let url = URL + this.props.tabLabel + QUERY_STR
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
            full_name: item.item.full_name,
            // component: RepositoryDetail,
            url: item.item.html_url,
            // ...this.props
        });
    }

    renderRow(data) {
        return <GithubRepoCell
            key={data.id}
            data={data}
            onSelect={() =>
                this.onSelectRepository(data)
            }
            onFavorite={(isFavo) => {
                this.favoDao.saveFavoItem('最热', data, !isFavo)
                const action = starPopuAction()
                store.dispatch(action)
            }}
        />
    }
}

export default PopularPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    tips: {
        fontSize: 20
    }
})
