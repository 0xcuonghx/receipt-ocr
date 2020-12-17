import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import UploadComponent from '../../components/Upload';
import { createReceiptOCR } from '../../store/asyncActions/receipt.actions';

export default function Upload() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const goToAdd = React.useCallback(() => {
    navigation.navigate('Receipt', { screen: 'Add', params: { isAddOcr: true } });
  }, [navigation]);

  const handleUploadFile = React.useCallback(({ uri, fileName, type }) => {
    const formData = new FormData();
    formData.append('image', {
      uri,
      name: fileName,
      type
    });
    dispatch(createReceiptOCR(formData, goToAdd));
  }, [dispatch, goToAdd]);

  return (
    <UploadComponent handleUploadFile={handleUploadFile} />
  );
}
