import React, { useState } from 'react'
import { 
    StyleSheet,
    View, 
    Text, 
    TouchableOpacity, 
    TextInput, 
    Dimensions 
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addEditDeleteTodo } from '../store/todos'
import { AntDesign } from '@expo/vector-icons'

const { width } = Dimensions.get('window')

export default function AddTodo({navigation}) {
    const dispatch = useDispatch()
    const [value, onChangeText] = useState('')
    const { todos } = useSelector(state => state.todos)
    const addTodoItem = value => {
        if( value ) {
            let todoEntry;
            if(!todos) {
                todoEntry = [{ 'index': todos ? todos.length + 1 : 1, 'isDone': false, 'task': value}];
            } else {
                todoEntry = [...todos, { 'index': todos ? todos.length + 1 : 1, 'isDone': false, 'task': value}];
            }
            dispatch(addEditDeleteTodo(todoEntry));
            onChangeText('')
            navigation.navigate('ViewTodos')
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>React Native Todo App</Text>
            <View style={styles.innerContainer}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => onChangeText(text)}
                    value={value}
                    placeholder="Add a task to do"
                />
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => addTodoItem(value)}
                >
                    <AntDesign name="plus" size={24} color="white" />
                </TouchableOpacity>
            </View>
            {todos && <TouchableOpacity
                    style={{
                        backgroundColor: 'white'
                    }}
                    onPress={() => navigation.navigate('ViewTodos')}
                >
                    <Text style={{
                        color: '#dc3545',
                        fontWeight: 'bold'
                    }}>View Your Todo List</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: width
    },
    innerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '90%',
        marginTop: 30,
        marginBottom: 20,
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
    },
    buttonContainer: {
        height: 50,
        backgroundColor: '#222',
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        padding: 10,
        margin: 0,
        justifyContent: 'center',
        alignItems: 'center',
    }
})