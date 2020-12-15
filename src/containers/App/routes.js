import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { View } from 'native-base';
import Receipt from '../Receipts';
import Report from '../../components/Report';
import Budgets from '../Budgets';
import Setting from '../Setting';
import UploadModal from '../../components/Upload';

import ReceiptIcon from '../../../assets/images/receipts.png';
import ReportIcon from '../../../assets/images/report.png';
import BudgetIcon from '../../../assets/images/budget.png';
import SettingIcon from '../../../assets/images/setting.png';

function Upload() {
  return <View />;
}
export const Screens = {
  Receipts: 'Receipt',
  Report: 'Report',
  Budgets: 'Budgets',
  Settings: 'Settings',
  Upload: 'Upload'
};
export const routes = [
  {
    name: Screens.Receipts,
    component: Receipt,
    options: {
      tabBarIcon: () => (
        <Image
          source={ReceiptIcon}
          style={styles.image}
        />
      )
    }
  },
  {
    name: Screens.Report,
    component: Report,
    options: {
      tabBarIcon: () => (
        <Image
          source={ReportIcon}
          style={styles.image}
        />
      )
    }
  },
  {
    name: Screens.Upload,
    component: Upload,
    options: {
      tabBarButton: () => (
        <UploadModal />
      )
    }
  },
  {
    name: Screens.Budgets,
    component: Budgets,
    options: {
      tabBarIcon: () => (
        <Image
          source={BudgetIcon}
          style={styles.image}
        />
      )
    }
  },
  {
    name: Screens.Settings,
    component: Setting,
    options: {
      tabBarIcon: () => (
        <Image
          source={SettingIcon}
          style={styles.image}
        />
      )
    }
  }
];

const styles = StyleSheet.create({
  image: {
    width: 24, height: 24
  },
});
