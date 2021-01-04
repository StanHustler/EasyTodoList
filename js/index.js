$(function() {
    $('#title').on('keydown', function(event) {
        // 按下回车键保存代办事项
        if (event.keyCode == 13) {
            // 先读取本地存储原来的数据
            var local = getData();
            // 更新 local 数组，追加数据
            local.push({ title: $(this).val(), done: false });
            // 把 local 数组存储到本地
            saveData(local);
            // 清空输入框
            $(this).val("");
            // 渲染加载数据
            loadData();
            // 刷新页面
            window.location.reload();
        }
    });

    // 读取本地存储的数据
    function getData() {
        var data = localStorage.getItem('todoList');
        // 本地存储的数据是字符串格式的，需要转化为对象格式
        return data != null ? JSON.parse(data) : [];
    }

    // 保存本地存储数据
    function saveData(data) {
        localStorage.setItem('todoList', JSON.stringify(data));
    }

    // 渲染加载数据
    function loadData() {
        // 清空数据
        $('.complete-content,.being-content').empty();
        // 读取本地存储的数据
        var data = getData();
        // 计算数据数量
        var completeCount = 0;
        var beingCount = 0;
        // 遍历数据
        $.each(data, function(i, n) {
            var elemObj;
            if (data[i].done) {
                elemObj = $('.complete-content');
                completeCount++;
            } else {
                elemObj = $('.being-content');
                beingCount++;
            }
            elemObj.append(`                    
                <li>
                    <input type="checkbox">
                    <p>${data[i].title}</p>
                    <a href="javascript:;" id="${i}" class="del"><svg t="1592019482211" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2841" width="200" height="200"><path d="M728.32 62.0032a38.4 38.4 0 1 0-33.28 69.2224A424.96 424.96 0 0 1 934.4 512c0 232.9088-189.4912 422.4-422.4 422.4S89.6 744.9088 89.6 512 279.0912 89.6 512 89.6a38.4 38.4 0 0 0 0-76.8C236.7488 12.8 12.8 236.7488 12.8 512s223.9488 499.2 499.2 499.2 499.2-223.9488 499.2-499.2a502.1184 502.1184 0 0 0-282.88-449.9968z" fill="#d81e06" p-id="2842"></path><path d="M731.4432 331.008a38.4 38.4 0 0 0-65.5872-27.136L512 457.728 358.144 303.8208a38.4 38.4 0 0 0-54.3232 54.272L457.728 512l-153.856 153.856a38.2976 38.2976 0 0 0 27.136 65.536 38.0928 38.0928 0 0 0 27.136-11.264L512 566.3232l153.856 153.856a38.2976 38.2976 0 0 0 65.536-27.136 38.0928 38.0928 0 0 0-11.264-27.136L566.3232 512l153.856-153.856a38.0928 38.0928 0 0 0 11.264-27.136z" fill="#d81e06" p-id="2843"></path></svg></a>
                </li>`);
        });
        $('.complete-content').find('input').prop('checked', true);
        $('.being-count').text(beingCount);
        $('.complete-count').text(completeCount);
        triggerComplete(data);
        deleteData(data);
    }

    // 给删除按钮绑定点击事件
    function deleteData(data) {
        $('.being-content,.complete-content').on('click', '.del', function() {
            var title = $(this).siblings('p').html();
            var index;
            $.each(data, function(i, n) {
                if (title == data[i].title) index = i;
            })
            data.splice(index, 1);
            saveData(data);
            loadData();
        })
    }

    // 给input:checkbox添加事件
    function triggerComplete(data) {
        $('.being-content,.complete-content').on('click', 'input', function() {
            var index = $(this).siblings('a').attr('id');
            data[index].done = $(this).prop('checked');
            saveData(data);
            loadData();
        })
    }
    loadData();
})