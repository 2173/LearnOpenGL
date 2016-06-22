#version 330 core

uniform vec3 objectcolor;
uniform vec3 lightcolor;
uniform vec3 lightPos;
uniform vec3 viewPos;
in vec3 Normal;
in vec3 fragPos;
out vec4 color;

void main()
{
	float specularStrength = 0.5f;

    vec3 lightDir = normalize(lightPos - fragPos);
	vec3 normal = normalize(Normal);

	vec3 viewDir = normalize(viewPos - fragPos);
	vec3 reflecDir = reflect(-lightDir, normal);
	//���32�Ǹ߹�ķ���ֵ(Shininess)��һ������ķ���ֵԽ�ߣ�����������Խǿ��ɢ���Խ�٣��߹��ԽС
	float spec = pow(max(dot(viewDir, reflecDir), 0.0), 64);

	
	
	float diff = max(dot(normal, lightDir), 0);

    float ambientStrength = 0.1f;
    vec3 ambient = (ambientStrength  + diff + spec * specularStrength) * lightcolor;
    vec3 result = ambient * objectcolor;
    color = vec4(result, 1.0f);
}
