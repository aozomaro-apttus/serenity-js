import { Ensure, equals, Expectation } from '@serenity-js/assertions';
import { KnowableUnknown, Task } from '@serenity-js/core';
import { GetRequest, LastResponse, Send } from '@serenity-js/rest';

export const VerifyResultAt = (url: KnowableUnknown<string>, expectation: Expectation<KnowableUnknown<any>>) =>
    Task.where(`#actor verifies result at ${ url }`,
        Send.a(GetRequest.to(url)),
        Ensure.that(LastResponse.status(), equals(200)),
        Ensure.that(LastResponse.body(), expectation),
    );
