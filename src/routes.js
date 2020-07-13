import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/login';
import User from './pages/user';
import Register from './pages/register';
import ResetPassword from './pages/resetPassword';
import Forgot_password from './pages/forgot_password';
import AddUserCars from './pages/addUserCars';
import UpdateUserCar from './pages/updateUserCar';
import UserParametres from './pages/userParametres';
import Home from './pages/home';
import NewEvent from './pages/newEvent';
import Event from './pages/event';
import AddEventCars from './pages/addEventCars';
import CarEdit from './pages/carEdit';
import NotFoundPage from './pages/notFoundPage';
import EventEdit from './pages/eventEdit';


export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/newEvent' component={NewEvent} />
                <Route path='/event/:id' exact component={Event} />
                <Route path='/event/:id/addCars' component={AddEventCars} />
                <Route path='/car/edit' component={CarEdit} />
                <Route path='/login' exact component={Login} />
                <Route path='/user' exact component={User} />
                <Route path='/register' component={Register} />
                <Route path='/resetpassword' component={ResetPassword} />
                <Route path='/forgot_password' component={Forgot_password} />
                <Route path='/add_user_cars' component={AddUserCars} />
                <Route path='/updateUserCar' component={UpdateUserCar} />
                <Route path='/userParametres' component={UserParametres} />
                <Route path='/event/:id/edit' component={EventEdit} />
                <Route path="*" component={NotFoundPage} />
            </Switch>
        </BrowserRouter>
    )
}
