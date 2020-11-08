(function(window) {

	// 面向对象编程

	// 定义链表
	function LinkList(linkList, len) {
		this.list = linkList;
		this.len = len;
	}

	// 定义节点
	function Node(value, next) {
		this.value = value || '';
		this.next = next || null;
	}

	// 创建节点
	function createNode(value) {
		return new Node(value);
	}

	// 创建链表
	function createLinkList() {

		if (arguments.length <= 0) {
			return;
		}

		var linkList = null;
		var currentNode, nextNode;

		// 创建第一个节点
		currentNode = createNode(arguments[0]);
		linkList = currentNode;

		// 循环创建下个节点，让当前节点连接下个节点，并且让当前节点改为下一节点
		for (var i = 1, len = arguments.length; i < len; i++) {

			nextNode = createNode(arguments[i]);
			currentNode.next = nextNode;

			currentNode = nextNode;

		}

		// 释放节点
		currentNode = null;
		nextNode = null;

		return new LinkList(linkList, arguments.length);
	}

	// 打印链表
	function printLinkList() {

		var list = this.list;

		// 保存第一个节点
		let result = [];
		result.push(list.value);

		// 只要当前节点的下一指向不为null，就获取下一节点，保存下一节点的值，直至下一指向为null
		while (list.next != null) {
			list = list.next;
			result.push(list.value);
		}

		// 返回结果
		return result.join(' ');

	}

	// 在指定位置插入节点，不指定默认插入表尾，position从1开始。
	function insertNode(value, position) {

		var list = this.list;

		var node = createNode(value);

		// 插入表头
		if (position === 1) {
			node.next = list;
			this.list = node;
			this.len++;
			return;
		}

		// 插入表尾
		if (!position || position > this.len) {
			var j = 1;
			var currentNode = list;
			while (j < this.len) {
				currentNode = currentNode.next;
				j++;
			}
			currentNode.next = node;
			this.len++;
			return;
		}

		// 插入非表头非表尾
		var i = 1;
		var lastNode = list;
		var nextNode = list.next;
		while (++i <= position) {
			if (i === position) {
				lastNode.next = node;
				node.next = nextNode;
				this.len++;
			} else {
				lastNode = nextNode;
				nextNode = nextNode ? nextNode.next : null;
			}
		}

	}

	// 删除指定位置的节点，不指定默认删除表头
	function removeNode(position) {

		if (!position) position = 1;

		if (position > this.len) position = this.len;

		var i = 1;
		var currentNode = this.list;
		while (i < position) {
			if (i + 1 === position) {
				currentNode.next = currentNode.next ? currentNode.next.next : null;
			} else {
				currentNode = currentNode.next;
			}
			i++;
		}

	}

	// 链表排序
	function sortLinkList() {

		// 引用当前链表
		var currentNode = this.list;

		// 初始化排序链表
		var sortList = createLinkList(currentNode.value);

		// 遍历当前链表，将值插入到排序链表的相应位置
		var insertValue;
		while (currentNode.next !== null) {

			// 指向下一节点并获取插入值
			currentNode = currentNode.next;
			insertValue = currentNode.value;

			// 依次从前往后比较插入
			var node = JSON.parse(JSON.stringify(sortList.list));
			var pos = 1;
			while (node != null) {
				if (insertValue < node.value) {
					// 插在该节点前面
					sortList.insertNode(insertValue, pos);
					node = null;
				} else if (node.next === null) {
					// 插在最后
					sortList.insertNode(insertValue);
					node = null;
				} else {
					node = node.next;
					pos++;
				}

			}

		}

		this.list = sortList.list;

	}

	// 获取中间节点
	// TODO:获取倒数第n个节点？双指针
	function getMiddleNode() {
		// 使用快慢指针实现
		var quick = this.list;
		var slow = this.list;
		while (slow.next !== null) {
			quick = quick.next ? quick.next.next : null;
			if (quick === null) {
				return slow.value;
			}
			slow = slow.next;
		}
		return slow.value;

	}

	// TODO:链表反转

	// TODO:链表合并

	// TODO:链表获取指定位置节点的值

	// TODO:链表修改指定位置节点的值

	LinkList.prototype.printLinkList = printLinkList;
	LinkList.prototype.insertNode = insertNode;
	LinkList.prototype.removeNode = removeNode;
	LinkList.prototype.sortLinkList = sortLinkList;
	LinkList.prototype.getMiddleNode = getMiddleNode;

	window['createLinkList'] = createLinkList;

})(window)