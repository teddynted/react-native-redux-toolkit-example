import React, { useState } from 'react'
import { 
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    StatusBar,
    Dimensions
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { addEditDeleteTodo } from '../store/todos'
import { MaterialIcons, AntDesign } from '@expo/vector-icons'

const { width } = Dimensions.get('window');

export default function ViewTodos({navigation}) {
    const { todos } = useSelector(state => state.todos)
    const dispatch = useDispatch()
    const toggleTaskStatus = i => {
        let updateTodoItem = todos.map(item => {
            if(item.index === i - 1) {
                let isDone = !item.isDone,
                temp = Object.assign({}, item, { 'isDone': isDone });
                return temp;
            }
            return item;
        });
        dispatch(addEditDeleteTodo(updateTodoItem))
    }
    const deleteTask = i => {
        let deleteTodoItem = todos.filter(({index}) => index !== i);
        dispatch(addEditDeleteTodo(deleteTodoItem === 0 ? null : deleteTodoItem))
        if( deleteTodoItem === 0 ) {
            navigation.navigate('AddTodo');
        }
    }
    console.log(todos);
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>My Todo's</Text>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => navigation.navigate('AddTodo')}
            >
                <Text style={styles.buttonText}>Add New</Text>
            </TouchableOpacity>
            <FlatList
                data={todos}
                keyExtractor={ (_, index) => index.toString()}
                renderItem={ ({ item }) =>
                    <View style={styles.todoItem}>
                        <TouchableOpacity
                            onPress={() => toggleTaskStatus(item.index)}
                        >
                            <MaterialIcons 
                                name={item.isDone ? 'check-circle' : 'radio-button-unchecked'} 
                                size={24} 
                                color={item.isDone ? '#28a745' : '#dc3545'} 
                            />
                        </TouchableOpacity>
                        <Text style={styles.todoItemText}>
                            {item.task}
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('EditTodo', { item: { 'index': item.index }})}
                        >
                            <AntDesign name="edit" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => deleteTask(item.index)}
                        >
                            <AntDesign name="delete" size={24} color="#dc3545" />
                        </TouchableOpacity>
                    </View>
                }
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
    },
    todoItem: {
        justifyContent: 'space-between',
        alignContent: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ccc',
        width: width - 20,
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 5,
        paddingRight: 5
    },
    text: {
        color: '#101010',
        fontSize: 20,
        fontWeight: 'bold'
    },
    todoItemText: {
        lineHeight: 22,
        fontSize: 17
    },
    buttonContainer: {
        backgroundColor: '#222',
        borderRadius: 5,
        padding: 10,
        margin: 20
    },
    buttonText: {
        fontSize: 15,
        color: '#fff'
    }
})