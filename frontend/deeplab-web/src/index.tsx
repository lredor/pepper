/*******************************************************************************
 * Copyright (c) 2024 CEA LIST.
 * This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v2.0
 * which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Contributors:
 *     Obeo - initial API and implementation
 *******************************************************************************/
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';
import { ExtensionRegistry } from '@eclipse-sirius/sirius-components-core';
import { NodeTypeContribution } from '@eclipse-sirius/sirius-components-diagrams';
import {
  DiagramRepresentationConfiguration,
  NodeTypeRegistry,
  SiriusWebApplication,
  navigationBarIconExtensionPoint,
  footerExtensionPoint,
  navigationBarMenuIconExtensionPoint,
} from '@eclipse-sirius/sirius-web-application';
import { createRoot } from 'react-dom/client';
import { httpOrigin, wsOrigin } from './core/URL';
import { EllipseNode } from './nodes/EllipseNode';
import { EllipseNodeConverter } from './nodes/EllipseNodeConverter';
import { EllipseNodeLayoutHandler } from './nodes/EllipseNodeLayoutHandler';

import './ReactFlow.css';
import './fonts.css';
import './portals.css';
import './reset.css';
import './variables.css';
import { Footer } from './footer/Footer';
import { Help } from './core/Help';
import { PepperIcon } from './core/PepperIcon';

if (process.env.NODE_ENV !== 'production') {
  loadDevMessages();
  loadErrorMessages();
}

const extensionRegistry: ExtensionRegistry = new ExtensionRegistry();

const nodeTypeRegistry: NodeTypeRegistry = {
  nodeLayoutHandlers: [new EllipseNodeLayoutHandler()],
  nodeConverters: [new EllipseNodeConverter()],
  nodeTypeContributions: [<NodeTypeContribution component={EllipseNode} type={'ellipseNode'} />],
};

// Help component contribution
extensionRegistry.addComponent(navigationBarMenuIconExtensionPoint, {
  identifier: 'pepper-help',
  Component: () => <Help />,
});

// Footer contribution
extensionRegistry.addComponent(footerExtensionPoint, {
  identifier: 'pepper-footer',
  Component: Footer,
});

// Main icon contribution
extensionRegistry.addComponent(navigationBarIconExtensionPoint, {
  identifier: 'pepper_navigationbar#icon',
  Component: PepperIcon,
});

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <SiriusWebApplication httpOrigin={httpOrigin} wsOrigin={wsOrigin} extensionRegistry={extensionRegistry}>
    <DiagramRepresentationConfiguration nodeTypeRegistry={nodeTypeRegistry} />
  </SiriusWebApplication>
);
