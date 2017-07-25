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

    removeButtonOfItem(item) {
        return $(`//label[text()="${item}"]/../button[@class="destroy"]`);
    }

    addItem(item) {
        this.input.setValue(item);
        browser.keys('\uE007');
    }

    removeItem(item) {
        this.labelOfItem(item).moveToObject();
        this.removeButtonOfItem(item).click();
    }
}

module.exports = new TodoPage();
