const TodoPage = require('../pageobjects/Todo.page');

describe('Todo list', function() {
    beforeEach(function() {
        TodoPage.open();
    });

    describe('Add item', function() {

        describe('Hitting Enter', function() {

            it('adds item to the list', function() {
                TodoPage.input.setValue('new item');
                browser.keys('\uE007');

                $('label=new item').waitForVisible();
            });
        });
    });
});
