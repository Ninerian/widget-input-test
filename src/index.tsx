/*!
 * Copyright 2020, Staffbase GmbH and contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BlockFactory, BlockDefinition, ExternalBlockDefinition } from "widget-sdk";

const factory: BlockFactory = Base => {
    /**
     *  <groda-test message="world!"></groda-test>
     */
    return class GrodaTestBlock extends Base {

        public constructor() {
            super();
        }

        public renderBlock(container: HTMLElement): void {
            const div = document.createElement('div')
            div.innerText="test";
            container.appendChild(div)
        }

        unmountBlock(container: HTMLElement): void {
            container.innerHTML = '';
        }

        public renderBlockInEditor(container: HTMLElement): void {
            const div = document.createElement('div')
            div.innerText="editor";
            container.appendChild(div)
        }
    };
};

const blockDefinition: BlockDefinition = {
    name: "example-widget",
    factory: factory,
    attributes: [],
    blockLevel: 'block',
    configurationSchema: {},
};

const externalBlockDefinition: ExternalBlockDefinition = {
    blockDefinition,
    author: "xx",
    version: "1.9.9"
};

window.defineBlock(externalBlockDefinition);
