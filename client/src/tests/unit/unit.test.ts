import React from 'react';
import Home from '../../components/home.component';
import renderer from 'react-test-renderer';

test('dump components renders initially', () => {
  const component = renderer.create(
    <Home onChange={() => {}} label="Hi i am a dump component" />
  );

  expect(component.toJSON()).toMatchSnapshot();
});