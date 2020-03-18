import React, { Component } from 'react';
import NavigationBar from '../widget/NavigationBar';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import TrendingRepoCell from '../widget/TrendingRepoCell';
import GithubRepoCell from '../widget/GithubRepoCell';
import FavoDao from '../dao/FavoDao';
import store from '../store';

const type = [{ name: '趋势' }, { name: '最热' }]

class FavoritePage extends Component {

    constructor(props) {
        super(props);
        this.state = store.getState()
        store.subscribe(()=>{
            this.forceUpdate()
        })
    }
    
    render() {
        let navigationBar =
            <NavigationBar
                title={'收藏'}
                statusBar={{ backgroundColor: "#2196F3" }}
            />;
        let content =
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
                {type.map((reuslt, i, arr) => {
                    let type = arr[i];
                    return <FavoriteTabContent key={i} flag={i === 0 ? this.state.trendStarFlag : this.state.popStarFlag} tabLabel={type.name} {...this.props} />;
                })}
            </ScrollableTabView>;
        return <View style={styles.container}>
            {navigationBar}
            {content}
        </View>
    }
}

class FavoriteTabContent extends Component {
    constructor(props) {
        super(props)
        this.favoDao = new FavoDao();
        // this.dataRepository = new DataRepository(this.props.tabLabel === '趋势' ? FLAG_STORAGE.flag_trending : FLAG_STORAGE.flag_popular);
        this.state = {
            type: this.props.tabLabel,
            dataSource: [],
            isLoading: false,
        }
    }
    componentDidMount() {
        this.loadData()
    }
    render() {
        return (
            <View style={styles.container} >
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
        this.favoDao.fetchFavo(this.state.type)
            .then((res) => {
                let items = res && res.items ? res.items : res ? res : []
                this.setState({
                    dataSource: items,
                    isLoading: false
                })
            }).catch(error => {
                console.log(error);
                this.setState({
                    isLoading: false
                });
            })
    }

    onSelectRepository(item) {
        this.state.type === '趋势' ? this.props.navigation.navigate('RepositoryDetail', {
            full_name: item.item.fullName,
            // component: RepositoryDetail,
            url: "https:///github.com/" + item.item.fullName,
            // ...this.props
        }) :
            this.props.navigation.navigate('RepositoryDetail', {
                full_name: item.item.full_name,
                // component: RepositoryDetail,
                url: item.item.html_url,
                // ...this.props
            });
    }

    renderRow(data) {
        return this.state.type === '趋势' ? <TrendingRepoCell
            key={data.id}
            data={data}
            onSelect={() =>
                this.onSelectRepository(data)
            }
            onFavorite={() => {

            }}
        /> : <GithubRepoCell
                key={data.id}
                data={data}
                onSelect={() =>
                    this.onSelectRepository(data)
                }
                onFavorite={() => {

                }}
            />
    }
}

export default FavoritePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    tips: {
        fontSize: 20
    }
})
