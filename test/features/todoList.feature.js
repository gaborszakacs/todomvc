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

                afterEach(function() {
                    TodoPage.removeItem('new item');
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

    describe('Remove item', function() {
        beforeEach(function() {
            TodoPage.addItem('new item');
        });

        describe('Remove button', function() {
            afterEach(function() {
                TodoPage.removeItem('new item');
            });

            context('when the mouse is not on the item', function() {

                it('is not visible', function() {
                    expect(TodoPage.removeButtonOfItem('new item').isVisible()).to.be.false;
                });
            })

            context('when the mouse is on the item', function() {
                beforeEach(function() {
                    TodoPage.moveMouseToItem('new item');
                })

                it('is visible', function() {
                    expect(TodoPage.removeButtonOfItem('new item').isVisible()).to.be.true;
                });
            })
        });

        describe('Clicking remove button', function() {
            beforeEach(function() {
                this.originalListSize = TodoPage.listSize;
                TodoPage.removeItem('new item');
            });

            it('removes the item', function() {
                TodoPage.labelOfItem('new item').waitForVisible(undefined, true);
            });

            it('decreases the items size', function() {
                expect(TodoPage.listSize).to.be.eq(this.originalListSize - 1);
            });
        });
    });
});
