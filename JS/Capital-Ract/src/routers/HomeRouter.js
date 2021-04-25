import React from 'react'
import { Redirect, Switch, Route } from "react-router-dom";
import { HomeScreen } from '../componentes/home/HomeScreen';
import { Admin } from '../componentes/admin/Admin';
import { Bar }      from '../componentes/bar/Bar';
import { Menu }     from '../componentes/menu/Menu';
import { Rockola }  from '../componentes/rockola/Rockola';
import { Nosotros } from '../componentes/nosotros/Nosotros';


export const HomeRouterXXX = () => {
    return (   
        <div>     
            
           
                <div>
                    <Switch>
                        <Route exact path="/" component={HomeScreen} />                   
                        <Route exact path="/admin"    component={Admin} />
                        <Route exact path="/bar"      component={Bar} />
                        <Route exact path="/menu"     component={Menu} />
                        <Route exact path="/rockola"  component={Rockola} />
                        <Route exact path="/nosotros" component={Nosotros} />
                        <Redirect to="/" />
                    </Switch>
                </div>
            
        </div>
    )
}
