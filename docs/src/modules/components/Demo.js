// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Collapse from 'material-ui/transitions/Collapse';
import CodeIcon from 'material-ui-icons/Code';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import NoSSR from 'docs/src/modules/components/NoSSR';

const styles = theme => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    backgroundColor: theme.palette.background.contentFrame,
    marginBottom: 40,
    marginLeft: -16,
    marginRight: -16,
  },
  demo: theme.mixins.gutters({
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  }),
  codeButton: {
    display: 'none',
    zIndex: 10,
    position: 'absolute',
    top: 2,
    right: 7,
  },
  code: {
    display: 'none',
    padding: 0,
    margin: 0,
    '& pre': {
      overflow: 'auto',
      margin: '0px !important',
      borderRadius: '0px !important',
    },
  },
  [theme.breakpoints.up(600)]: {
    codeButton: {
      display: 'block',
    },
    code: {
      display: 'block',
    },
    root: {
      marginLeft: 0,
      marginRight: 0,
    },
  },
});

class Demo extends React.Component<any, any> {
  state = {
    codeOpen: false,
  };

  handleCodeButtonClick = () => {
    this.setState({
      codeOpen: !this.state.codeOpen,
    });
  };

  render() {
    const { classes, js: DemoComponent, name, raw } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          title={this.state.codeOpen ? 'Hide the source' : 'Show the source'}
          onClick={this.handleCodeButtonClick}
          className={classes.codeButton}
        >
          <CodeIcon />
        </IconButton>
        <Collapse in={this.state.codeOpen}>
          <NoSSR>
            <MarkdownElement className={classes.code} text={`\`\`\`js\n${raw}\n\`\`\``} />
          </NoSSR>
        </Collapse>
        <div className={classes.demo} data-mui-demo={name}>
          <DemoComponent />
        </div>
      </div>
    );
  }
}

Demo.propTypes = {
  classes: PropTypes.object.isRequired,
  js: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  raw: PropTypes.string.isRequired,
};

export default withStyles(styles)(Demo);
