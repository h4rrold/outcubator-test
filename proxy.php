<?php


$method = $_SERVER['REQUEST_METHOD'];

$headers = getHeaders();
$url = getUrl();

$ch = curl_init($url);

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = curl_exec($ch);
curl_close($ch);

header('Content-Type: application/json');

echo $result;


function getHeaders(): array
{
    $headers = getallheaders();
    $headersStr = [];

    foreach ($headers as $key => $value) {
        if ($key == 'Host') {
            continue;
        }
        $headersStr[] = $key.":".$value;
    }

    return $headersStr;
}

function getUrl(): string
{
    $url = $_GET['url'] or die('Outbound url is empty');

    $params = [];
    foreach ($_GET as $key => $param) {
        if ($key !== 'url') {
            $params[$key] = $param;
        }
    }

    return sprintf('%s?%s', $url, http_build_query($params));
}
