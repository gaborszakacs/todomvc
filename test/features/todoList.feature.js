const TodoPage = require('../pageobjects/Todo.page');

describe('Todo list', function() {
    beforeEach(function() {
        TodoPage.open();
    });

    describe('Add item', function() {

        describe('Hitting Enter', function() {
            beforeEach(function() {
                this.originalListSize = TodoPage.listSize;
            });

            context('when input is not empty', function() {
                beforeEach(function() {
                    TodoPage.addItem('new item');
                });

                it('adds an item to the list', function() {
                    expect(TodoPage.listSize).to.be.eq(this.originalListSize + 1);
                });

                it('makes the input value appear as a label', function() {
                    TodoPage.labelOfItem('new item').waitForVisible();
                });
            })

            context('when input is empty', function() {
                beforeEach(function() {
                    TodoPage.addItem('  ');
                    browser.pause(1000);
                });

                it('does not add item to the list', function() {
                    expect(TodoPage.listSize).to.be.eq(this.originalListSize);
                });
            })
        });
    });
});
