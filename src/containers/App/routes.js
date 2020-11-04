import React from 'react';
import { Image } from 'react-native';

import ListReceipt from '../../components/Receipts/List';
import Report from '../../components/Report';
import ListBudget from '../../components/Budgets/List';
import Setting from '../../components/Setting';

export const Screens = {
  Receipts: 'Receipt',
  Report: 'Report',
  Budgets: 'Budgets',
  Settings: 'Settings'
}
export const routes = [
  {
  name: Screens.Receipts,
  component: ListReceipt,
  options: { 
    tabBarIcon: () => (<Image
      source={require('../../../assets/images/receipts.png')}
      style={{width: 24, height: 24}}
    />) 
  }
  },
  {
    name: Screens.Report,
    component: Report,
    options: { 
      tabBarIcon: () => (<Image
        source={require('../../../assets/images/report.png')}
        style={{width: 24, height: 24}}
      />)
     }
  },
  {
    name: Screens.Budgets,
    component: ListBudget,
    options: { 
      tabBarIcon: () => (<Image
        source={require('../../../assets/images/budget.png')}
        style={{width: 24, height: 24}}
      />)
     }
  },
  {
    name: Screens.Settings,
    component: Setting,
    options: { 
      tabBarIcon: () => (<Image
        source={require('../../../assets/images/setting.png')}
        style={{width: 24, height: 24}}
      />)
     }
  }
]