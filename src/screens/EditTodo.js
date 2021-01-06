import React, { useState } from 'react'
import {StyleSheet, View, Text, TouchableOpacity, TextInput} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { addEditDeleteTodo } from '../store/todos'

export default function EditTodo({navigation, route}) {
    const dispatch = useDispatch()
    const { todos } = useSelector(state => state.todos)
    const index = route.params.item.index;
    const taskToUpdate = todos.filter(todo => todo.index === index);
    const [value, onChangeText] = useState(taskToUpdate[0].task);
    const updateTodoItem = () => {
        if( value ) {
            let updateTodoItem = todos.map(item => {
                if( item.index === index ) {
                    let temp = Object.assign({}, item, { 'task': value });
                    return temp;
                }
                return item;
            });
            dispatch(addEditDeleteTodo(updateTodoItem))
            onChangeText('')
            navigation.navigate('ViewTodos')
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Edit Todo</Text>
            <TextInput
                    style={styles.textInput}
                    onChangeText={text => onChangeText(text)}
                    value={value}
            />
            <View 
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignContent: 'center'
                }}
            >
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => updateTodoItem()}
                >
                    <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => navigation.navigate('ViewTodos')}
                >
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    text: {
        color: '#101010',
        fontSize: 20,
        fontWeight: 'bold'
    },
    textInput: {
        height: 50, 
        width: '70%',
        borderColor: '#ccc', 
        borderWidth: 1,
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8,
        paddingLeft: 10,
        fontSize: 17,
        marginTop: 20,
        marginBottom: 10
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