import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import AddTodo from '../screens/AddTodo'
import EditTodo from '../screens/EditTodo'
import ViewTodos from '../screens/ViewTodos'

const Stack = createStackNavigator()

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='AddTodo'
                screenOptions={{
                    gestureEnabled: true,
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name='AddTodo'
                    component={AddTodo}
                    options={{ title: 'AddTodo' }}
                />
                <Stack.Screen
                    name='EditTodo'
                    component={EditTodo}
                    options={{ title: 'EditTodo' }}
                />
                <Stack.Screen
                    name='ViewTodos'
                    component={ViewTodos}
                    options={{ title: 'ViewTodos' }}
                />
        </Stack.Navigator>
    </NavigationContainer>)
}
