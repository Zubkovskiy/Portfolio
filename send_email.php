<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $phon = $_POST["phon"];
    $message = $_POST["message"];

    $to = "order@zubkovskiy.site";
    $subject = "Новое сообщение с сайта";
    $body = "Имя: $name\nPhone: $phon\nСообщение:\n$message";

    $headers = "From: $phon\r\n";
    $headers .= "Reply-To: $phon\r\n";
    $headers .= "Content-type: text/plain; charset=utf-8\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "Сообщение успешно отправлено!";
    } else {
        echo "Что-то пошло не так. Пожалуйста, попробуйте еще раз.";
    }
}
?>