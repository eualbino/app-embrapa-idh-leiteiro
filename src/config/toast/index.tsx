import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BaseToast, ErrorToast, ToastConfig } from 'react-native-toast-message';
import { theme } from '../index';

const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={styles.successToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
      text2NumberOfLines={2}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={styles.errorToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
      text2NumberOfLines={2}
    />
  ),
  info: (props) => (
    <BaseToast
      {...props}
      style={styles.infoToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
      text2NumberOfLines={2}
    />
  ),
  warning: (props) => (
    <BaseToast
      {...props}
      style={styles.warningToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
      text2NumberOfLines={2}
    />
  ),
};

const styles = StyleSheet.create({
  successToast: {
    borderLeftColor: theme.colors.state.success,
    borderLeftWidth: 5,
    backgroundColor: theme.colors.background.default,
    height: 70,
    width: '90%',
  },
  errorToast: {
    borderLeftColor: theme.colors.state.error,
    borderLeftWidth: 5,
    backgroundColor: theme.colors.background.default,
    height: 70,
    width: '90%',
  },
  infoToast: {
    borderLeftColor: theme.colors.state.info,
    borderLeftWidth: 5,
    backgroundColor: theme.colors.background.default,
    height: 70,
    width: '90%',
  },
  warningToast: {
    borderLeftColor: theme.colors.state.warning,
    borderLeftWidth: 5,
    backgroundColor: theme.colors.background.default,
    height: 70,
    width: '90%',
  },
  contentContainer: {
    paddingHorizontal: theme.spacing.md,
  },
  text1: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text.primary,
  },
  text2: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.regular,
    color: theme.colors.text.secondary,
  },
});

export default toastConfig;
