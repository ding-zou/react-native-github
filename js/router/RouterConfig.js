import SplashPage from "../page/SplashPage"
import PopularPage from "../page/PopularPage"
import HomePage from "../page/HomePage"
import { createStackNavigator } from "react-navigation-stack"
import RepositoryDetail from "../page/RepositoryDetail"
import TrendingPage from "../page/TrendingPage"
import FavoritePage from "../page/FavoritePage"
import MinePage from "../page/MinePage"

export const RouterConfigs = createStackNavigator({
    Splash: SplashPage, // screen属性为必须配置属性
    Home: HomePage,
    Popular: PopularPage,
    RepositoryDetail:RepositoryDetail,
    Trending:TrendingPage,
    Favorite:FavoritePage,
    Mine:MinePage,
}, {
    initialRouteName: 'Splash',
    navigationOptions:{
        headerShown: false,  //隐藏顶部导航栏

    }
    // Home2: {
    //   screen: Home2,
    //   path:'app/Home2',
    //   navigationOptions: {
    //     title: '这是在RouteConfigs中设置的title',
    //     headerTitleStyle: {
    //       fontSize: 10
    //     }
    //   }
    // },
})