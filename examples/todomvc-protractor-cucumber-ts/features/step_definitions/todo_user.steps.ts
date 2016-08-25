import { Serenity } from 'serenity-bdd';
import { Actors, AddATodoItem, Start, TodoListItems } from 'todomvc-screenplay';

import { CompleteATodoItem } from '../../src/complete_a_todo_item';
import { expect } from '../../src/expect';
import { listOf } from '../../src/text';

module.exports = function () {

    /**
     *  Initialises Serenity with a custom Cast of Actors, specific to your domain
     */
    let stage = Serenity.callToStageFor(new Actors());

    this.Given(/^.*that (.*) has an empty todo list$/, (name: string) => {

        return stage.theActorCalled(name).attemptsTo(
            Start.withAnEmptyTodoList());
    });

    this.Given(/^.*that (.*) has a todo list containing (.*)$/, (name: string, items: string) => {

        return stage.theActorCalled(name).attemptsTo(
            Start.withATodoListContaining(listOf(items))
        );
    });

    this.When(/^s?he adds (.*?) to (?:his|her) list$/, (itemName: string) => {

        return stage.theActorInTheSpotlight().attemptsTo(
            AddATodoItem.called(itemName)
        );
    });

    this.When(/^s?he completes (.*)$/, (itemName: string) => {

        return stage.theActorInTheSpotlight().attemptsTo(
            CompleteATodoItem.called(itemName)
        );
    });

    this.Then(/^(.*?) should be recorded in his list$/, (item: string) => {

        return expect(stage.theActorInTheSpotlight().toSee(TodoListItems.displayed()))
            .eventually.eql([ item ]);
    });

    this.Then(/^(.*?) should be marked as completed$/, (item: string) => {

        return Promise.resolve();
    });

    this.Then(/^.* todo list should contain (.*?)$/, (items: string) => {

        return expect(stage.theActorInTheSpotlight().toSee(TodoListItems.displayed()))
            .eventually.eql(listOf(items));
    });
};
