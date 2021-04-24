import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AddDrinks } from '../../componentes/admin/AddDrinks';
import { AddFoods } from '../../componentes/admin/AddFoods';
import { Admin } from '../../componentes/admin/Admin';
import { NewDrink } from '../../componentes/admin/NewDrink';
import { NewFood } from '../../componentes/admin/NewFood';
import { Bar } from '../../componentes/bar/Bar';
import { Facturacion } from '../../componentes/Facturacion';
import { Menu } from '../../componentes/menu/Menu';
/* import { MenuDrinks } from '../../componentes/menu/menuDrinks';
import { MenuFoods } from '../../componentes/menu/MenuFoods'; */
import { Rockola } from '../../componentes/rockola/Rockola';

export const RoutsOwner = () => {
    return (
        <>
            <Switch>
                    <Route exact path="/owner/admin"           component={Admin} />
                    <Route exact path="/owner/admin/addDrinks" component={AddDrinks} />
                    <Route exact path="/owner/admin/addFoods"  component={AddFoods} />
                    <Route exact path="/owner/admin/NewDrink"  component={NewDrink} />
                    <Route exact path="/owner/admin/NewFood"   component={NewFood} />
                    <Route exact path="/owner/bar"             component={Bar} />
                    <Route exact path="/owner/menu"            component={Menu} />
                    {/* <Route exact path="/owner/menu/drinks"      component={MenuDrinks} />
                    <Route exact path="/owner/menu/foods"      component={MenuFoods} /> */}
                    <Route exact path="/owner/rockola"         component={Rockola} />
                    <Route exact path="/owner/facturacion"         component={Facturacion} />

                    <Redirect to='/owner/admin' />
            </Switch>
        </>
    )
}
