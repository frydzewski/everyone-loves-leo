#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { EveryoneLovesLeoStack } from '../lib/stack';

const app = new cdk.App();
new EveryoneLovesLeoStack(app, 'EveryoneLovesLeo', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
  },
});
