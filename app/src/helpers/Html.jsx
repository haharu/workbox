import React, {Component, PropTypes} from 'react';
import {renderToString} from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

export default class Html extends Component {
    static propTypes = {
        assets: PropTypes.object,
        component: PropTypes.node,
        store: PropTypes.object
    };

    render() {
        const {assets, component, store} = this.props;
        const content = component
            ? renderToString(component)
            : '';
        const head = Helmet.rewind();

        return (
            <html>
                <head>
                    {head.base.toComponent()}
                    {head.title.toComponent()}
                    {head.meta.toComponent()}
                    {head.link.toComponent()}
                    {head.script.toComponent()}
                    <link rel="shortcut icon" href="/favicon.ico"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    {Object.keys(assets.styles).map((style, key) => <link href={assets.styles[style]} key={key} media="screen, projection" rel="stylesheet" type="text/css" charSet="UTF-8"/>)}
                </head>
                <body>
                    <div id="app" dangerouslySetInnerHTML={{
                        __html: content
                    }}/>
                    <script dangerouslySetInnerHTML={{
                        __html: `window.__INITIAL_STATE__=${serialize(store.getState())};`
                    }} charSet="UTF-8"/>
                    {Object.keys(assets.javascript).map((script, i) =>
                        <script src={assets.javascript[script]} key={i}/>
                    )}
                </body>
            </html>
        );
    }
}
