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

import ReactDOM from "react-dom";
import { configurationSchema } from "./configuration-schema";
import React, { FunctionComponent, useState } from "react";
import Form from "@rjsf/material-ui";
import { IChangeEvent, FormProps } from "@rjsf/core";
import { JSONSchema7 } from "json-schema";
import { GrodaTestProps } from "groda-test";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'groda-test': { message?: string, list?: string }
        }
    }
}

const SEPARATOR = '","';

const toString = ([key, value]: [string, any]): [string, string] => {
    let _value: string = value;

    switch (typeof value) {
        case 'number':
            _value = value.toString()
            break;
        case 'object':
            _value = value.join ? value.join(SEPARATOR) : JSON.stringify(value)
            break;

    }

    return [key, _value];
}

const WidgetWrapper: FunctionComponent<any> = ({ children, ...props }) => {

    const attrs = Object.entries(props).map(toString)
        .reduce((acc, [key, value]) => {
            acc[key] = value; return acc;
        }, {} as GrodaTestProps);


    return (
        React.cloneElement(children, attrs)
    )
}

const Preview: FunctionComponent = () => {
    const [formState, setFormState] = useState<FormProps<any>>({ message: 'hello' } as unknown as FormProps<any>);

    const changeHandler: FormProps<any>['onChange'] = (e) => {
        console.log(e.formData);
        setFormState(e.formData);
    }
    return (
        <>
            <div className="box">
                <h3>Widget preview:</h3>
                <br />
                <br />
                <WidgetWrapper {...formState}>
                    <groda-test/>
                </WidgetWrapper>
            </div>

            <div className="box">
                <h3>Configuration preview:</h3>
                <Form
                    schema={configurationSchema}
                    autoComplete={'off'}
                    formData={formState}
                    onChange={changeHandler}
                />
            </div>
        </>
    )
}

ReactDOM.render(
    <Preview />
    , document.getElementById("preview"));
