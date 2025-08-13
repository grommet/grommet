import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import { hpe } from 'grommet-theme-hpe';

import {
  Grommet,
  Table,
  TableHeader,
  TableFooter,
  TableBody,
  TableRow,
  TableCell,
} from '../..';

test('Table renders', () => {
  const { container } = render(
    <Grommet theme={hpe}>
      <Table />
    </Grommet>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Table renders outside grommet', () => {
  const { container } = render(<Table />);

  expect(container.firstChild).toMatchSnapshot();
});

test('Table caption renders', () => {
  const { container } = render(
    <Grommet theme={hpe}>
      <Table caption="Caption" />
    </Grommet>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('TableHeader renders', () => {
  const { container } = render(
    <Grommet theme={hpe}>
      <Table>
        <TableHeader />
      </Table>
    </Grommet>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('TableFooter renders', () => {
  const { container } = render(
    <Grommet theme={hpe}>
      <Table>
        <TableFooter />
      </Table>
    </Grommet>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('TableBody renders', () => {
  const { container } = render(
    <Grommet theme={hpe}>
      <Table>
        <TableBody />
      </Table>
    </Grommet>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('TableRow renders', () => {
  const { container } = render(
    <Grommet theme={hpe}>
      <Table>
        <TableBody>
          <TableRow />
        </TableBody>
      </Table>
    </Grommet>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('TableCell renders', () => {
  const { container } = render(
    <Grommet theme={hpe}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell />
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell />
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell />
          </TableRow>
        </TableFooter>
      </Table>
    </Grommet>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('TableCell scope renders', () => {
  const { container } = render(
    <Grommet theme={hpe}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell scope="col" />
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell scope="row" />
          </TableRow>
        </TableBody>
      </Table>
    </Grommet>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('TableCell size renders', () => {
  const { container } = render(
    <Grommet theme={hpe}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell size="xsmall" />
            <TableCell size="small" />
            <TableCell size="medium" />
            <TableCell size="large" />
          </TableRow>
        </TableBody>
      </Table>

      <Table>
        <TableBody>
          <TableRow>
            <TableCell size="1/2" />
            <TableCell size="2/4" />
          </TableRow>
        </TableBody>
      </Table>

      <Table>
        <TableBody>
          <TableRow>
            <TableCell size="1/3" />
            <TableCell size="2/3" />
          </TableRow>
        </TableBody>
      </Table>

      <Table>
        <TableBody>
          <TableRow>
            <TableCell size="1/4" />
            <TableCell size="3/4" />
          </TableRow>
        </TableBody>
      </Table>
    </Grommet>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('TableCell verticalAlign renders', () => {
  const { container } = render(
    <Grommet theme={hpe}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell verticalAlign="top" />
            <TableCell verticalAlign="middle" />
            <TableCell verticalAlign="bottom" />
          </TableRow>
        </TableHeader>
      </Table>
    </Grommet>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('TableCell plain renders', () => {
  const { container } = render(
    <Grommet theme={hpe}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell plain />
          </TableRow>
        </TableHeader>
      </Table>
    </Grommet>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('TableCell border renders', () => {
  const { container } = render(
    <Grommet>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell border="top" />
            <TableCell border={{ side: 'top', size: 'medium' }} />
            <TableCell
              border={[
                { side: 'right', size: 'medium' },
                { side: 'bottom', size: 'large' },
              ]}
            />
          </TableRow>
        </TableHeader>
      </Table>
    </Grommet>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Table with ref', () => {
  const ref = React.createRef<HTMLTableElement>();
  render(
    <Grommet theme={hpe}>
      <Table ref={ref} />
    </Grommet>,
  );

  expect(ref.current).not.toBeNull();
});
