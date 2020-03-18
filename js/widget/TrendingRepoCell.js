import React, { Component } from 'react';
import HTMLView from 'react-native-htmlview'
import { TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native';
import FavoDao from '../dao/FavoDao';

class TrendingRepoCell extends Component {
    constructor(props) {
        super(props);
        this.favoDao = new FavoDao()
        this.state = {
            isFavorite:false,
            favoriteIcon: require('../../res/images/ic_unstar_transparent.png')
        }
    }
    setFavo(isFavorite){
        this.setState({
            isFavorite: isFavorite,
            favoriteIcon: isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_unstar_transparent.png')
        })
    }
    onPressFavo() {
        this.setFavo(!this.state.isFavorite)
        this.props.onFavorite(this.state.isFavorite)
    }
    render() {
        let data = this.props.data
        let favoriteButton = <TouchableOpacity
            onPress={() => this.onPressFavo(data)}>
            <Image style={{ height: 22, width: 22 }}
                source={this.state.favoriteIcon}
            />
        </TouchableOpacity>
        return (
            <TouchableOpacity
                onPress={this.props.onSelect}
                style={styles.container}
            >
                <View style={styles.cell_container}>
                    <Text style={styles.title}>{data.item.fullName}</Text>
                    <HTMLView
                        value={data.item.description}
                        stylesheet={styles.des} />
                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row', color: 'red' }}>
                        <Text style={{ color: 'red' }}>Star:</Text>
                        <Text style={{ color: 'red' }}>{data.item.meta}</Text>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.rowIn}>
                        <Text>Build By:</Text>
                            {data.item.contributors.map((result, i, arr) => {
                                return <Image
                                    key={i}
                                    style={{ height: 22, width: 22 }}
                                    source={{ uri: arr[i] }}
                                />
                            })}
                        </View>
                        {favoriteButton}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default TrendingRepoCell;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    row: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowIn: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 17,
        marginBottom: 2,
        color: '#212121',
        flex: 1
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    },
    cell_container: {
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderColor: '#dddddd',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2
    },
})
