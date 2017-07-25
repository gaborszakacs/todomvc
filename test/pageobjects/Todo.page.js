class TodoPage {
    get input() { return $('.new-todo'); }
    get todoList() { return $('ul.todo-list'); }

    get listSize() { return this.todoList.elements('li').value.length; }

    open() {
        browser.url('');
        this.input.waitForVisible();
    }

    labelOfItem(item) {
        return $(`label=${item}`);
    }

    addItem(item) {
        this.input.setValue(item);
        browser.keys('\uE007');
    }
}

module.exports = new TodoPage();
