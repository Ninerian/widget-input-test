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

import React, { ReactElement } from "react";
import { BlockAttributes } from "widget-sdk";

/**
 * React Component
 */
export interface GrodaTestProps extends BlockAttributes {
    message: string;
    list: string;
    select: string;
}

const SEPARATOR = '","';
const toArray = (data: string) => data.split(SEPARATOR);

export const GrodaTest = ({ message, list, select }: GrodaTestProps): ReactElement => {
    return <div>Hello {message}
        {list &&
            (<div>
                <ul>
                    {toArray(list).map((value, index) => (
                        <li key={`base-${index}`}>{value}</li>
                    ))}
                </ul>
            </div>)
        }
    { select && (
        <div>Selected: {select}</div>
    )}
    </div>;
};
