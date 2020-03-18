import React, { Component } from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native';
import FavoDao from '../dao/FavoDao';

class GithubRepoCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFavorite: false,
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
                    <Text style={styles.title}>{data.item.full_name}</Text>
                    <Text style={styles.des}>{data.item.description}</Text>
                    <View style={styles.row}>
                        <View style={styles.row}>
                            <Text>Author:</Text>
                            <Image
                                style={{ height: 22, width: 22 }}
                                source={{ uri: data.item.owner.avatar_url }}
                            />
                        </View>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text>Star:</Text>
                            <Text>{data.item.stargazers_count}</Text>
                        </View>
                        {favoriteButton}

                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default GithubRepoCell;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    row: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
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
